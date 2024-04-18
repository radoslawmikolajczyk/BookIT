# API Dokumentacja

---


## /api/users

- **GET** /api/users/{id}
  - pobranie wszystkich danych użytkownika na podstawie ID
  - przykładowy request: 
    - /api/users/1
- **GET** /api/users/getByEmail/{email}
  - pobranie wszystkich danych użytkownika na podstawie email
  - przykładowy request: 
    - /api/users/jan.kowalski@test.com
- **POST** /api/users/register
  - rejestracja użytkownika, API przyjmuje JSON'a. Poniżej przykładowy request:
    - /api/users/register
      ```
        {
        "firstName": "Jan",
        "lastName": "Kowalski",
        "email": "jan.kowalski@test.com",
        "password": "test"
        }
        ```

- **POST** /api/users/login
  - logowanie użytkownika. Request body musi również mieć postać JSONa. Przykładowy request:
    - /api/users/login
    ```
    {
       "email": "jan.kowalski@test.com",
       "password": "test"
    }
    ```
## /api/rooms

- **POST** /api/rooms/createRooms
  - metoda umożliwia utworzenie pokoi. Przyjmuje listę obiektów typu Room w postaci JSON. Przykładowy request:
    - /api/rooms/createRooms
    ```
    [
       {
          "buildingName": "Pawilon F",
          "floorNumber": 5,
          "roomName": "506",
          "description": "Przestronna sala",
          "imageUrl": "https://bg.uek.krakow.pl/"
       }
    ]
    ```
- **GET** /api/rooms/getAllRooms
  - metoda umożliwia pobranie wszystkich pokoi. Nie przyjmuje żadnych parametrów. Przykładowa odpowiedź:
  ```
  {
    "rooms": [
      {
        "id": 1,
        "buildingName": "Pawilon A", 
        "floorNumber": 1,
        "roomName": "111",
        "description": "Sala wyposażona w 30 wygodnych krzeseł ustawionych w amfiteatralny układ.\nPosiada rzutnik, ekran oraz tablicę do pisania na marker. \nDostęp do Wi-Fi dla uczestników.\nMaksymalna liczba osób: 30.",
        "imageUrl": "https://cj.uek.krakow.pl/files/Zdj%C4%99cia%20sal%20CJ/Sala%20210.jpg"
      }
    ],
    "isSuccess": true
  }
  ```
- **POST** /api/rooms/getAvailableRooms
  - Metoda zwraca dostępne pokoje do rezerwacji. Przyjmuje JSON, w którym parametr "startTime" jest wymagany. Pozostałe parametry: "endTime", "buildingName", "floorNumber" są opcjonalne. "startTime" oraz "endTime" są typu Datetime o formacie yyyy-MM-dd HH:mm. Przykładowy request
  ```
  {
    "startTime": "2024-04-18 12:22",
    "endTime": "2024-04-18 14:22",
    "buildingName": "Pawilon A",
    "floorNumber": 1
  }
  ```

## /api/reservations

- **GET** /api/reservations/getAllUserReservations/{email}
  - Metoda zwraca wszystkie rezerwacje danego użytkownika na podstawie jego emaila. Przykładowy request `GET /api/reservations/getAllUserReservations/jan.kowalski@test.com`
- **GET** /api/reservations/getHistoryReservations/{email}
  - Metoda zwraca wszystkie historyczne rezerwacje danego użytkownika na podstawie jego emaila.
- **POST** /api/reservations/createReservation
  - Metoda służy do utworzenia rezerwacji, przyjmuje JSONa o postaci: 
  ```
  {
   "userEmail": jan.kowalski@test.com
   "roomId": 1; # Id pokoju
   "startTime": "2024-04-18 12:22"
   "endTime": "2024-04-18 14:22"
  }
  ```
  
- **DELETE** /api/reservations/deleteReservation
  - Metoda służy do usunięcia rezerwacji. Przyjmuje JSONa o identycznej strukturze jak metoda `POST /api/reservations/createReservation`

## /api/groups

- **GET** /api/groups/get/{id}
  - Metoda zwraca podstawowe informacje o grupie na podstawie jej ID. Przykładowy request `GET /api/groups/get/{id}`
- **GET** /api/groups/getAllGroups 
  - Metoda zwraca listę wszystkich dostępnych grup. Nie przyjmuje żadnych parametrów
- **POST** /api/groups/createGroups
  - Metoda umożliwia utworzenie grup. Jako parametr przyjmuje listę grup w postaci JSON. Przykładowy request
  ```
  [
    {
        "name": "ZIISN2-1211",
        "password": "test"
    },
    {
        "name": "ZIISN2-1212",
        "password": "test"
    }
  ]
  ```
- **POST** /api/groups/addUserToGroup
  - Metoda umożliwia dodanie użytkownika do grupy na podstawie nazwy grupy oraz jej hasła + email użytkownika. Przyjmuje request w postaci JSONa. Przykład:
  ```
  {
   "userEmail": "jan.kowalski@test.com",
   "groupName": "ZIISN2-1212",
   "groupPassword": "test"
  }
  ```

---

## Response

Response jaki zwraca API jest zawsze w postaci JSONa. Parsowana jest klasa RequestResponse w zależności od tego na jaką metodę strzelimy, taką otrzymamy odpowiedź. Np. strzelamy GETem na metodę _/api/users/1_, nasza odpowiedź wygląda następująco:
```
{
  "user": {
    "id": 1,
    "firstName": "Jan",
    "lastName": "Kowalski",
    "email": "jan.kowalski@test.com",
    "password": "c27c4b28f84ccbcec7e0"
  },
  "isSuccess": true
}
```

Poniżej przykładowa błędna odpowiedź:
```
{
    "message": "Exception occurred: Query produced no result",
    "isSuccess": false
}
```