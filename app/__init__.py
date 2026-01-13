# Shafin Kazi, Alvin Sze, Thamidur Rahman, Sean Takahashi
# Tachyons Guinea Pigs
# SoftDev pd4
# p02
# 2026-01-16f

from flask import Flask, render_template, request, session, redirect, url_for, flash
from auth import bp as auth_bp
import sqlite3, os

app = Flask(__name__)
app.register_blueprint(auth_bp)
app.secret_key = os.urandom(24)
DB_FILE = "users.db"

def setup_database():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            password TEXT,
            points INTEGER DEFAULT 0
        );
    """)
    db.commit()
    db.close()
setup_database()

@app.get("/")
def home_get():
    return render_template("home.html")

@app.get("/game_file")
def game_get():
    return render_template("game_file.html")

@app.post("/game")
def game_post():
    return redirect(url_for('game_get'))


### Useful general functions ###

# data: "key": value}
def insert_query(table, data):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    placeholder = ["?"] * len(data)
    c.execute(f"INSERT INTO {table} {tuple(data.keys())} VALUES ({', '.join(placeholder)});", tuple(data.values()))
    c.close()
    db.commit()

def dictify(raw, c):
    output = []
    for row in raw:
        d = dict()
        for col in range(len(row)):
            d.update({c.description[col][0]: row[col]})
        output.append(d)
    return output

# params: [val1, val2]
# returns [{'key1': val1}]
def general_query(query_string, params=()):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute(query_string, params)
    raw = c.fetchall()
    output = dictify(raw, c)
    c.close()
    db.commit()
    return output

def get_user(name):
    user = general_query(f"SELECT * FROM profiles WHERE username=?", [name])
    return None if len(user) == 0 else user[0]



if __name__ == "__main__":
    app.debug = True
    app.run()
