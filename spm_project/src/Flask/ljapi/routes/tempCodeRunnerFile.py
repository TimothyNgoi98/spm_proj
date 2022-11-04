@jobrole.route('/hraddjobrole',methods=['POST'])
def hraddrole():
    print("Hello!")
    data = request.get_json()
    jobrole_name = data['role_name']
    department = data['role_dept']
    jobrole_desc = data['role_desc']
    jobrole_status = data['Active']


    if Jobrole.query.filter_by(jobrole_name=jobrole_name).first():
        return jsonify({
            "code":404,
            "message": "There is an existing Role Name in the Database. Please check your input fields."
        })
    newjobrole = Jobrole( jobrole_name=jobrole_name,department=department,jobrole_desc=jobrole_desc,jobrole_status=jobrole_status)
    try:
        print("adding session")
        db.session.add(newjobrole)
        db.session.commit()

        return jsonify({
            "code": 200,
            "message": "Job role has been added successfully!"
        })
    
    except:
        print("Error")
        return jsonify({
            "code":500,
            "message": "There is error with creating a new jobrole."
        })