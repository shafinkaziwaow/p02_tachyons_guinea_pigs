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
            level_1 INTEGER DEFAULT 0,
            level_2 INTEGER DEFAULT 0,
            level_3 INTEGER DEFAULT 0,
            total_points INTEGER DEFAULT 0
        );
    """)
    db.commit()
    db.close()
setup_database()


@app.route("/")
def home_get():
    if (session.get('username')):
        db = sqlite3.connect(DB_FILE)
        c = db.cursor()
        temp = c.execute("SELECT * FROM users ORDER BY total_points DESC LIMIT 5")
        users = []
        for u in temp:
            list = []
            for var in u:
                list.append(var)
            users.append(list)
        db.close()
        return render_template("home.html", users = users)

    return(redirect(url_for("auth.login_get")))


@app.get("/game_scene")
def game_get():
    if (session.get('username')):
        return render_template("game_scene.html")
    return(redirect(url_for("auth.login_get")))


@app.post("/game")
def game_post():
    if (session.get('username')):
        return redirect(url_for('game_get'))
    return(redirect(url_for("auth.login_get")))

@app.route("/submit_score", methods=['POST'])
def submit_score():
    if session.get('username'):
        score = request.form.get('score')
        level = request.form.get('level')
        username = session.get('username')

        db = sqlite3.connect(DB_FILE)
        c = db.cursor()
        current_points, total_points = c.execute("SELECT ?, total_points FROM users WHERE username=?", (level, username,)).fetchone()

        if current_points:
            if current_points[0] < score:
                new_points = score
            c.execute("UPDATE users SET ?=? total_points=? WHERE username=?", (level, new_points, total_points, username))
            db.commit()
            flash(f'New score recorded!', 'success')
        db.commit()
        db.close()
        return redirect(url_for("game_get"))
    return(redirect(url_for("auth.login_get")))


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
