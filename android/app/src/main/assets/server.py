import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'db.sqlite'


#extract user rows
def get_row_as_dict_user(row):
    row_dict = {
        'userId': row[0],
        'userName': row[1],
        'email': row[2],
        'password': row[3],
		'phoneNumber': row[4],
		'gender': row[5]
    }
    return row_dict

#extract book rows
def get_row_as_dict_book(row):
    row_dict = {
        'bookId': row[0],
		'userId': row[1],
        'bookName': row[2],
        'genre': row[3],
        'language': row[4],
		'year': row[5],
		'condition': row[6],
		'description': row[7]
    }
    return row_dict

#extract trade rows
def get_row_as_dict_trade(row):
    row_dict = {
        'tradeId': row[0],
        'user1Id': row[1],
        'user2Id': row[2],
        'date': row[3],
		'status': row[4],
        'user2Rate':row[5]
    }
    return row_dict

#extract trade details rows
def get_row_as_dict_tradeDetails(row):
    row_dict = {
        'tradeDetailsId': row[0],
        'tradeId': row[1],
        'userId': row[2],
        'bookId': row[3]
    }
    return row_dict

#extract rate rows
def get_row_as_dict_rate(row):
    row_dict = {
        'rateId': row[0],
        'userId': row[1],
        'rate': row[2]
    }
    return row_dict


app = Flask(__name__)

#-------------------------------------------------------------------------------------------------------------user
#used in LoginScreen
@app.route('/api/user', methods=['GET'])
def retrieveAllUser():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user ORDER BY userId')
    rows = cursor.fetchall()
    print(rows)
    db.close()
    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict_user(row)
        rows_as_dict.append(row_as_dict)
    return jsonify(rows_as_dict), 200

#used in ProfileScreen, ViewProfileScreen, BookDetailsScreen
@app.route('/api/user/<int:userId>', methods=['GET'])
def retrieveAUser(userId):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user WHERE userId=?', (str(userId),))
    row = cursor.fetchone()
    db.close()
    if row:
        row_as_dict = get_row_as_dict_user(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

#used in RegisterScreen
@app.route('/api/user', methods=['POST'])
def addAUser():
    if not request.json:
        abort(404)
    new_user = (
        request.json['userName'],
        request.json['email'],
        request.json['password'],
        request.json['phoneNumber'],
        request.json['gender'],
    )
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO user(userName,email,password,phoneNumber,gender)
        VALUES(?,?,?,?,?)
    ''', new_user)
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201
#-------------------------------------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------------------------------book 
#used in HomeScreen, ProfileScreen
@app.route('/api/book', methods=['GET'])
def retrieveAllBook():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM book ORDER BY bookId')
    rows = cursor.fetchall()
    print(rows)
    db.close()
    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict_book(row)
        rows_as_dict.append(row_as_dict)
    return jsonify(rows_as_dict), 200

#used in BookDetailsScreen
@app.route('/api/book/<int:bookId>', methods=['GET'])
def retrieveABook(bookId):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM book WHERE bookId=?', (str(bookId),))
    row = cursor.fetchone()
    db.close()
    if row:
        row_as_dict = get_row_as_dict_book(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

#used in AddBookScreen
@app.route('/api/book', methods=['POST'])
def addABook():
    if not request.json:
        abort(404)
    new_book = (
        request.json['userId'],
        request.json['bookName'],
        request.json['genre'],
		request.json['language'],
		request.json['year'],
        request.json['condition'],
        request.json['description'],
    )
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO book(userId,bookName,genre,language,year,condition,description)
        VALUES(?,?,?,?,?,?,?)
    ''', new_book)
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201

#used in EditBookScreen
@app.route('/api/book/<int:bookId>', methods=['PUT'])
def updateABook(bookId):
    if not request.json:
        abort(400)
    update_book = (
        request.json['bookName'],
        request.json['genre'],
		request.json['language'],
		request.json['year'],
        request.json['condition'],
        request.json['description'],
        str(bookId),
    )
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        UPDATE book SET 
        bookName=?,genre=?,language=?,year=?,condition=?,description=? 
        WHERE bookId=?
    ''', update_book)
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201

#used in BookDetailsScreen
@app.route('/api/book/<int:bookId>', methods=['DELETE'])
def deleteABook(bookId):
    if not request.json:
        abort(400)
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('DELETE FROM book WHERE bookId=?', (str(bookId),))
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201
#-------------------------------------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------------------------------trade 
#used in TradeScreen
@app.route('/api/trade', methods=['GET'])
def retrieveAllTrade():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM trade ORDER BY tradeId DESC')
    rows = cursor.fetchall()
    print(rows)
    db.close()
    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict_trade(row)
        rows_as_dict.append(row_as_dict)
    return jsonify(rows_as_dict), 200

#used in TradeDetailsScreen
@app.route('/api/trade/<int:tradeId>', methods=['GET'])
def retrieveATrade(tradeId):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM trade WHERE tradeId=?', (str(tradeId),))
    row = cursor.fetchone()
    db.close()
    if row:
        row_as_dict = get_row_as_dict_trade(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

#used in StartTradeScreen
@app.route('/api/trade', methods=['POST'])
def addATrade():
    if not request.json:
        abort(404)
    new_trade = (
        request.json['user1Id'],
        request.json['user2Id'],
        request.json['date'],
    )
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO trade(user1Id,user2Id,date,status,user2Rate)
        VALUES(?,?,?,"Requesting","0")
    ''', new_trade)
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201

#used in TradeDetailsScreen
@app.route('/api/trade/<int:tradeId>', methods=['PUT'])
def updateATrade(tradeId):
    if not request.json:
        abort(400)
    update_trade = (
        request.json['status'],
        request.json['user2Rate'],
        str(tradeId),
    )
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        UPDATE trade SET 
        status=?,user2Rate=? 
        WHERE tradeId=?
    ''', update_trade)
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201

#used in TradeDetailsScreen
@app.route('/api/trade/<int:tradeId>', methods=['DELETE'])
def deleteATrade(tradeId):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('DELETE FROM trade WHERE tradeId=?', (str(tradeId),))
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201
#-------------------------------------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------------------------------tradedetails 
#used in TradeDetailsScreen
@app.route('/api/tradeDetails', methods=['GET'])
def retrieveAllTradeDetails():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM tradeDetails ORDER BY tradeDetailsId')
    rows = cursor.fetchall()
    print(rows)
    db.close()
    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict_tradeDetails(row)
        rows_as_dict.append(row_as_dict)
    return jsonify(rows_as_dict), 200

#used in StartTradeScreen
@app.route('/api/tradeDetails', methods=['POST'])
def addATradeDetails():
    if not request.json:
        abort(404)
    new_tradeDetails = (
        request.json['tradeId'],
        request.json['userId'],
        request.json['bookId'],
    )
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO tradeDetails(tradeId,userId,bookId)
        VALUES(?,?,?)
    ''', new_tradeDetails)
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201

#used in TradeDetailsScreen
@app.route('/api/tradeDetails', methods=['DELETE'])
def deleteATradeDetails(tradeDetailsId):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('DELETE FROM tradeDetails WHERE tradeDetailsId=?', (str(tradeDetailsId),))
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201
#-------------------------------------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------------------------------rate 
#used in ViewProfileScreen
@app.route('/api/rate', methods=['GET'])
def retrieveAllRate():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM rate ORDER BY rateId')
    rows = cursor.fetchall()
    print(rows)
    db.close()
    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict_rate(row)
        rows_as_dict.append(row_as_dict)
    return jsonify(rows_as_dict), 200

#used in TradeDetailsScreen
@app.route('/api/rate', methods=['POST'])
def addARate():
    if not request.json:
        abort(404)
    new_rate = (
        request.json['userId'],
        request.json['rate'],
    )
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO trade(user1Id,rate)
        VALUES(?,?)
    ''', new_rate)
    db.commit()
    response = {
        'affected': db.total_changes,
    }
    db.close()
    return jsonify(response), 201
#-------------------------------------------------------------------------------------------------------------

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)