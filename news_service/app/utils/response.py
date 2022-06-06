def generate_body(status, data = None, message ='', error = ''):
    return {
        'status': status,
        'message': message,
        'error': error,
        'data': data,
    }