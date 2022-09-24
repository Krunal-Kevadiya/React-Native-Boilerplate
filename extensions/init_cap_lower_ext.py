import string
from jinja2.ext import Extension

def initCapLower(value, **kwargs):
    return value[0].lower() + value[1:]

class InitCapLowerExtension(Extension):
    def __init__(self, environment):
        super(InitCapLowerExtension, self).__init__(environment)
        environment.filters['initCapLower'] = initCapLower