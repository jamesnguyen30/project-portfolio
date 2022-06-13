def generate_body(status, data:list = [], message:str ='', error:str = ''):
    return {
        'status': status,
        'message': message,
        'error': error,
        'count': len(data),
        'data': data,
    }