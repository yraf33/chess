from app import *



@app.route("/")
def index():
    return render_template('main_menu.html', title='ШААААААХМАТЫ')






rooms = list()
@socketio.on('join')
def on_join(data):
    join_room(data)


@socketio.on('update-games')
def on_update_games(data=None):
    join_room('active-games')
    games = active_games()['active-games']
    emit('update-games', {'games': games}, room='active-games')
    

@socketio.on('leave-active-games')
def on_leave():
    leave_room('active-games')