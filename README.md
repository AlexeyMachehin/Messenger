## Чат

Ссылка на render.com: [middle.messenger.praktikum.yandex_Link](https://messenger-tvcr.onrender.com)

***

## Описание:
Чат написан на чистом TS без подключения фреймворков. Реактивность реализована с помощью proxy. Соединение настроено через WebSocket.

***

## Стек технологий:
* Stylelint
* Docker
* Express
* Typescript
* Webpack
* Eslint
* REST-API
* Proxy
* WebSocket
* Pug
* Parcel
* Precommit
* Mocha-Chai

***

## Команды:
* Старт проекта: npm run start
* Сборка проекта: npm run build
* Старт режима разработчика: npm run dev
* Запуск тестов: npm run test

***

## Запуск:
Ввести в терминале команды:
* git clone https://github.com/AlexeyMachehin/middle.messenger.praktikum.yandex.git
* npm install
* npm run start

***

## Ветка sprint_1:
* Верстка сайта с использованием шаблонизатора Pug. 
* Добавлен локальный сервер на Express.

## Ветка sprint_2:
* Внедрен Typescript. 
* Настроены eslint, stylelint. 
* Добавлен класс для работы с запросами HTTPtransport.
* Компоненты сделаны на основе общего класса Block. 
* Используется EventBus, Proxy. 
* Обновление компонентов происходит за счет изменения props.
* В консоль выводятся значения инпутов по нажатию submit. 
* Добавлены валидация и события форм.

## Ветка sprint_3:
* В проект добавлен роутинг. 
* Внедрен HTTP API чатов. 
* Управление API происходит через контроллеры. 
* Добавлена авторизация (регистрация, авторизация, выход из системы). 
* Создан список чатов пользователя, добавлена возможность создавать чат, поиск чата по названию. 
* Настроена отправка сообщений. 
* Неавторизованный пользователь отправляется на страницу логина.
* Подключен WebSocket для работы с real-time сообщениями. 
* Чаты добавляются в store.

## Ветка sprint_4:
* Написаны тесты (Mocha и Chai) для роутера , компонента, модуля отправки запросов.
* Настроен  Webpack.
* Настроен precommit.
* Проект размещен на render.com с Docker-сборкой.
* Проведен аудит пакетов.

Превью:
![image](https://user-images.githubusercontent.com/99137228/222716400-9bd7cbdd-5518-455d-8cf3-bf74eb33001b.png)
![image](https://user-images.githubusercontent.com/99137228/222716457-c45677e8-5a52-4201-aee8-a0206344a086.png)
![chat](https://user-images.githubusercontent.com/99137228/222951282-5acd1f70-6fd5-4ef4-a947-6d93bc5f08b1.gif)


