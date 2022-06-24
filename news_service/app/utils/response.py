def generate_body(status, total: int = 0, data:list = [], message:str ='', error:str = ''):
    return {
        'status': status,
        'message': message,
        'error': error,
        'total': total,
        'data': data,
    }