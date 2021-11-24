from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    nome: str
    email: str
    cpf: str
    pis: str
    senha: str
    pais: str
    estado: str
    municipio: str
    cep: str
    rua: str
    numero: int
    complemento: str


class UpdateUser(BaseModel):
    nome: Optional[str]
    email: Optional[str]
    cpf: Optional[str]
    pis: Optional[str]
    senha: Optional[str]
    pais: Optional[str]
    estado: Optional[str]
    municipio: Optional[str]
    cep: Optional[str]
    rua: Optional[str]
    numero: Optional[int]
    complemento: Optional[str]


class ShowUser(BaseModel):
    nome: str
    email: str
    cpf: str
    pis: str
    pais: str
    estado: str
    municipio: str
    cep: str
    rua: str
    numero: int
    complemento: str

    class Config:
        orm_mode = True


class Login(BaseModel):
    # Login pode ser CPF, email ou PIS
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
