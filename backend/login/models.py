from sqlalchemy import Column, String, Integer
from .database import Base


class User(Base):
    __tablename__ = 'users'

    cpf = Column(String, primary_key=True, index=True)
    nome = Column(String, index=True)
    pis = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha = Column(String, nullable=False)

    # endereços poderia estar em outra tabela (opcional)
    pais = Column(String, index=True)
    estado = Column(String, index=True)
    municipio = Column(String, index=True)
    cep = Column(String)
    rua = Column(String, index=True)
    numero = Column(Integer)
    complemento = Column(String)
