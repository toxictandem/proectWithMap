Государственное бюджетное общеобразовательное учреждение города Москвы "Школа № 1505 "Преображенская"
 
   
КОМАНДНЫЙ КЕЙС
 
По дисциплине: «Информационные технологии»
 
На тему: «Разработка Web-приложения по построению маршрутов по интересным местам»
  
	Выполнили:
 
Батухтин Кирилл Евгеньевич,
Калюжная Анна Дмитриевна,
Федулов Никита Артемович
 
	
	 
 Москва, 2023

1.	Анализ технических требований
Формулировка технического требования - Разработать web-приложение, обеспечивающую работу с точками интереса на территории ВДНХ и построение различных пешеходных маршрутов с начальной точки у павильона №1 и  ограниченной длины. WEB приложение должно состоять из WEB-сервиса и базы данных.
Необходимые функции для реализации:
●	Создание образа карты ВДНХ с отображением точек интереса;
●	Создание базы данных с параметрами точек интереса:
○	ID;
○	Координаты;
○	Название объекта;
●	Генерация динамических маршрутов по заданным ограничениям:
○	Обязательное вхождение точек;
○	Лимит времени;
●	Визуализирование маршрутов;
●	Создание базы данных с параметрами сохраненных статических маршрутов:
○	ID;
○	ID точек маршрута;
○	Длина маршрута;
○	Время маршрута;
●	Сохранение всех сгенерированных маршрутов в виде статических;
●	Создание собственного статического маршрута по точкам;








2.	Выбор языка программирования и используемых программных средств
Django - веб-фреймворк на языке Python. Обеспечивает высокую безопасность, простой в освоении, производительный за счет встроенных шаблонов, подходит для написания проектов в ограниченные сроки.
SQLite3 - встраиваемая СУБД, поддерживаемая Django. Обеспечивает высокую скорость и надежность.
API Яндекс Карт - картографическая платформа, позволяющая использовать технологии Яндекс Карт. Обеспечивает простое создание геообъектов и встроенный маршрутизатор.
Python - высокоуровневый язык программирования, на котором поддерживается Django. Обеспечивает высокую читаемость и качества кода, подходит для написания проектов в ограниченные сроки.
HTML - стандартизированный язык разметки для просмотра веб-страниц в браузере. Обеспечивает высокую читаемость кода и способен взаимодействовать с JavaScript.
JavaScript - высокоуровневый язык программирования для frontend и backend частей сайта. Обеспечивает высокую читаемость и качество кода, способен взаимодействовать с HTML.
3.	Структурная и функциональная схема программного продукта 




4.	Блок схема генератора динамического маршрута
 
5.	Схема базы данных
 
6.	Описание испытаний
Запуск сервера через терминал:
 







Демонстрация точек интереса:
 
Демонстрация интерфейса добавления статических маршрутов:
 



Демонстрация ранее построенных маршрутов
 
Демонстрация построенного маршрута
 
Описание:
На странице “Создание динамического маршрута” пользователь может задать время маршрута в специальной форме и выбрать точки. Для этого нужно нажать по маркеру и поменять его значение состояния. Все добавленные точки будут показаны выше. По нажатии кнопки генерируется маршрут.
На странице “Создание динамического маршрута” пользователь может задать точки маршрута. Для этого нужно нажать по маркеру и поменять его значение состояния. Все добавленные точки будут показаны выше. По нажатии  кнопки генерируется маршрут.
На странице “Выбор статических маршрутов” содержаны все сгенерированные маршруты. У каждого маршрута есть свои параметры. По нажатии  кнопки генерируется маршрут.
7.	Ссылка на репрезиторий
https://github.com/toxictandem/proectWithMap.git
