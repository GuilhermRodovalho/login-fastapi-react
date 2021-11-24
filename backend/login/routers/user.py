from fastapi import APIRouter, status, Depends
from typing import List
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Header
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import user

from ..token import verify_token
from login.auth_bearer import EXCPETION, JWTBearer

from .. import schemas, database, oauth2
from ..repositories import user_repository

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

MYEXCEPTION = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token")


@router.post('/', response_model=schemas.ShowUser, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.User, db: Session = Depends(database.get_db)):
    return user_repository.create(user, db)


@router.get('/', response_model=List[schemas.ShowUser], status_code=status.HTTP_200_OK)
def index_users(db: Session = Depends(database.get_db)):
    return user_repository.index(db)


# @router.get('/get_logged_user', response_model=schemas.TokenData, status_code=status.HTTP_200_OK)
# def logged_user(db: Session = Depends(database.get_db),
#                 current_user: schemas.TokenData = Depends(oauth2.get_current_user)):
#     return current_user


@router.get('/me', dependencies=[Depends(JWTBearer())],  status_code=status.HTTP_200_OK)
def get_user(token: str = Depends(JWTBearer()), db: Session = Depends(database.get_db)):
    # data contém o username (email) do usuário
    data = oauth2.get_current_user(data=token)
    user = user_repository.get_user(data.username, db)
    del user.senha

    return user


@router.put('/me', dependencies=[Depends(JWTBearer())], response_model=schemas.ShowUser,  status_code=status.HTTP_200_OK)
def update_user(user: schemas.UpdateUser, token: str = Depends(JWTBearer()), db: Session = Depends(database.get_db)):
    id = oauth2.get_current_user(data=token)
    # print(data.username)
    updated_user = user_repository.update(data=user, email=id.username, db=db)
    return updated_user
