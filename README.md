# PI-2 Backend

Este é o backend do projeto PI-2, desenvolvido utilizando Node.js, Express e MongoDB. O objetivo deste backend é fornecer acesso a um banco de dados que ainda será modelado, permitindo a manipulação de dados através de uma API REST.

## Dependências

As seguintes dependências são utilizadas neste projeto:

- **Express**: Framework para Node.js utilizado para criar servidores e gerenciar rotas.
- **MongoDB**: Driver oficial do MongoDB para Node.js, utilizado para conectar e interagir com o banco de dados.

## Modelagem Inicial - Banco de Dados
![exemplo](/imgs/model-1.PNG)
```markdown
Table clients {
  id integer [primary key]
  name varchar
  email varchar
  phone integer
}

Table pets {
  id integer [primary key]
  client_id integer
  name varchar
  species varchar
  breed varchar
  age integer
}

Table appointments {
  id integer [primary key]
  client_id integer
  pet_id integer
  reason enum
  appointment_date date
  appointment_time time
  status enum
  notes varchar
}

Table time_slots {
  slot_date date
  slot_time time
  is_avaiable bool
  appointment_id integer
}

Table adms {
  id integer [ primary key ]
  username varchar
  password varchar
  password_hash varchar
}

Ref: clients.id < pets.client_id
Ref: appointments.client_id <> clients.id
Ref: appointments.pet_id <> pets.id
Ref: time_slots.appointment_id - appointments.id
```