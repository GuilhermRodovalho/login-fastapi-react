# Introdução

Esse projeto foi feito usando FastAPI para o backend e React para o frontend.

## Get started

Para rodar o projeto, siga as instruções a seguir

Primeiro você deve clonar o repositório, então abra o terminal no diretório desejado e entre com o comando:

```bash
git clone https://github.com/GuilhermRodovalho/login-fastapi-react
```

## Backend

Primeiro iremos configurar o backend, então rode:

```bash
cd login-fastapi-react/backend 
```

Agora você deve criar um ambiente virtual do python para instalarmos as dependências.

Rode o seguinte comando:

```bash
python3 -m venv fastapi-env 

# Agora selecione nosso diretório env como source:
source fastapi-env/bin/activate
```

Após isso, devemos instalar as dependências do projeto, segue o comando:

```bash
# Se estiver usando pip3
pip3 install -r requirements.txt
# Senão
pip install -r requirements.txt
```

Já está quase tudo pronto, agora falta só setar as variáveis de ambiente.

Rode

```bash
touch login/.env
```

e abra o arquivo .env no seu editor de texto de preferência. 

Para setar as variáveis de ambiente, use o arquivo .env.template de base. 

No final seu arquivo deve parecer com algo assim:

```
SECRET_KEY = "sequencia-aleatoria-de-numeros"
ALGORITHM = "algoritmo" # HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 60 
```

Agora, para inicializar o server, rode:

```bash
uvicorn login.main:app --reload
```

E se tiver dado tudo certo, o servidor está rodando em localhost:8000

### Docs

Para acessar a documentação, basta acessar o endereço <a>localhost:8000/docs</a> 

## Frontend

Abra o terminar na pasta raiz do projeto

```bash
cd frontend
```

Para instalar as dependências, rode:

```bash
# Se estiver usando yarn
yarn

# Se estiver usando npm
npm install
```

Com as dependências instaladas, rode:

```bash
yarn dev
```

E se tudo tiver corrido bem, o frontend do app deve estar rodando em <a>localhost:3000</a>







