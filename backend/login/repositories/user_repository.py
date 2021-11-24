from fastapi import HTTPException, status
from .. import hashing, models, schemas
from sqlalchemy.orm import Session


Hash = hashing.Hash


def create(user: schemas.User, db: Session):
    new_password = Hash.bcrypt(user.senha)

    new_user = models.User(
        nome=user.nome,
        pis=user.pis,
        cpf=user.cpf,
        email=user.email,
        senha=new_password,
        pais=user.pais,
        estado=user.estado,
        municipio=user.municipio,
        cep=user.cep,
        rua=user.rua,
        numero=user.numero,
        complemento=user.complemento
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def index(db: Session):
    users = db.query(models.User).all()
    return users


def get_user_from_username(username: str, db: Session):
    user = db.query(models.User).filter(models.User.email == username).first()

    if not user:
        user = db.query(models.User).filter(
            models.User.cpf == username).first()

    if not user:
        user = db.query(models.User).filter(
            models.User.pis == username).first()

    return user


def get_user(username: str, db: Session):
    user = get_user_from_username(username, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return user


def update(data: schemas.UpdateUser, email: str, db: Session):
    user = get_user_from_username(username=email, db=db)

    data.email = data.email if data.email else user.email
    data.cep = data.cep if data.cep else user.cep
    data.complemento = data.complemento if data.complemento else user.complemento
    data.cpf = data.cpf if data.cpf else user.cpf
    data.nome = data.nome if data.nome else user.nome
    data.numero = data.numero if data.numero else user.numero
    data.estado = data.estado if data.estado else user.estado
    data.municipio = data.municipio if data.municipio else user.municipio
    data.pais = data.pais if data.pais else user.pais
    data.cep = data.cep if data.cep else user.cep
    data.pis = data.pis if data.pis else user.pis
    data.rua = data.rua if data.rua else user.rua

    if data.senha:
        data.senha = Hash.bcrypt(data.senha)
    else:
        data.senha = user.senha

    users_updated = db.query(models.User).filter(
        models.User.email == email).update(data.__dict__)

    if users_updated > 1:
        raise Exception({"Algo de errado aconteceu"})
    else:
        db.commit()

    print(data.__dict__)
    print(users_updated)

    return data
