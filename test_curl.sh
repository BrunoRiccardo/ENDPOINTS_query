#!/bin/bash
# chmod +x users.sh   per permessi di esecuzione


BASE_URL="http://localhost:3000"

echo "=== GET USERS ==="
curl "$BASE_URL/users"
echo -e "\n\n"

echo "=== GET utente con ID 5 ==="
curl "$BASE_URL/user/5"
echo -e "\n\n"

echo "=== GET utenti di genere Female ==="
curl "$BASE_URL/user/gender/female"
echo -e "\n\n"

echo "=== GET utente Elena Ricci ==="
curl "$BASE_URL/users/Elena-Ricci"
echo -e "\n\n"


echo "=== GET FLIGHTS ==="
curl "$BASE_URL/flights"
echo -e "\n\n"

echo "=== GET flight con ID 4 ==="
curl "$BASE_URL/flight/4"
echo -e "\n\n"

echo "=== GET flight da departure e arrival city ==="
curl "$BASE_URL/flight/from/Paris/to/Miami"
echo -e "\n\n"

echo "=== POST nuovo utente ==="
curl -X POST $BASE_URL/users \
  -H "Content-Type: application/json" \
  -d '{"id":101,"firstname":"provolone","lastname":"formaggio","email":"provo6@test.it","gender":"Male","ip":"192.168.1.10"}'

echo -e "\n\n"

echo "=== POST nuovo flight ==="
curl -X POST $BASE_URL/flights \
  -H "Content-Type: application/json" \
  -d '{"id":999,"flightnumber":"AZ123","departurecode":"FCO","departurecity":"Rome","arrivalcode":"BER","arrivalcity":"Berlin","airlinecode":"AZ","airlinename":"ITA Airways","departuretime":"10:15","duration":2.2}'
echo -e "\n\n"


echo "=== PUT nuovo user ==="
curl -X PUT $BASE_URL/user/1 \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Luca","lastname":"Verdi","email":"verdi@test.it","gender":"Male","ip":"172.16.0.5"}'
echo -e "\n\n"


echo "=== PUT nuova email ==="
curl -X PUT $BASE_URL/user/1/email \
  -H "Content-Type: application/json" \
  -d '{"email":"nuova.email@test.it"}'
echo -e "\n\n"

echo "=== PUT nuovo IP ==="
curl -X PUT $BASE_URL/user/1/ip \
  -H "Content-Type: application/json" \
  -d '{"ip":"0.0.0.0"}'
echo -e "\n\n"

echo "=== PUT departuretime ==="
curl -X PUT $BASE_URL/flight/1/departuretime \
  -H "Content-Type: application/json" \
  -d '{"departuretime":"12:00"}'
echo -e "\n\n"

echo "=== PUT departuretime ==="
curl -X PUT $BASE_URL/flight/1/duration \
  -H "Content-Type: application/json" \
  -d '{"duration":3}'

echo -e "\n\n"

echo "=== PUT airline name ==="
curl -X PUT $BASE_URL/flight/4/airlinename \
  -H "Content-Type: application/json" \
  -d '{"airlinename":"PROVA"}'

echo -e "\n\n"

echo "=== PUT flight completo ==="
curl -X PUT $BASE_URL/flight/2 \
  -H "Content-Type: application/json" \
  -d '{"arrivalcity":"prova","duration":1,"airlinename":"prova"}'
  
echo -e "\n\n"

echo "=== DELETE user  ==="
curl -X DELETE $BASE_URL/user/22
echo -e "\n\n"

echo "=== DELETE ip  ==="
curl -X DELETE $BASE_URL/user/8/ip
echo -e "\n\n"

echo "=== DELETE flight  ==="
curl -X DELETE $BASE_URL/flight/10
echo -e "\n\n"

echo "=== DELETE flight  ==="
curl -X DELETE $BASE_URL/flight/11/airlinename
echo -e "\n\n"



echo "=== Script completato ==="
