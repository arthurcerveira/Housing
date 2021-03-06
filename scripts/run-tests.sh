#!/bin/bash

# Goes to the root of the project
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR
cd ..

URL="http://localhost:8000/api/"

# Check if the server is running
serverResponse=`wget --server-response --max-redirect=0 ${URL} 2>&1`

if [[ $serverResponse == *"Connection refused"* ]]
then
    echo "Server is not running"
    echo "Starting server..."

    npm run server &

    sleep 10s
fi

echo ""
echo "Running tests..."
echo ""

# Run the tests
cd tests
python3.6 -m unittest -v test_api.py

RESULT_API=$?

python3.6 -m unittest -v test_auth.py

RESULT_AUTH=$?

echo ""
echo "Finshed running tests"
echo ""
echo "To stop the server, enter the following command:"
echo "killall node"
echo ""

# Removes temporary file 
cd ..
FILE="./index.html"

if test -f "$FILE"; then
    rm $FILE
fi

# Returns 1 if the tests failed
if [ $RESULT_API -eq 0 ] && [ $RESULT_AUTH -eq 0 ]; then
    exit 0
else
    exit 1
fi
