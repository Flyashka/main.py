from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route("/")
def index():
    query = """
    {
      constants {
        heroes {
          id
          displayName
          shortName
        }
      }
    }
    """

    url = "https://api.stratz.com/graphql"
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiODBkODczN2UtZTBiYS00YmFhLTkwYzktMWRiNGZjNGE3NTIwIiwiU3RlYW1JZCI6IjQ2OTQ5NzIyOSIsIm5iZiI6MTcwNjUzMjQ0MSwiZXhwIjoxNzM4MDY4NDQxLCJpYXQiOjE3MDY1MzI0NDEsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.Cwz7yZ5MW1UblaqQrWJbmAdTGs-W_31m9rtTXGBPInc"
    }
    response = requests.post(url, json={"query": query}, headers=headers)
    data = response.json()

    print(data)

    if "errors" in data:
        error_message = "Ошибка в запросе:"
        error_details = data["errors"]
        return render_template("index.html", error_message=error_message, error_details=error_details)
    else:
        heroes = data["data"]["constants"]["heroes"]
        return render_template("index.html", heroes=heroes)


if __name__ == "__main__":
    app.run(debug=True)
