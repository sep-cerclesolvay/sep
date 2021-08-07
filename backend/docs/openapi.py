from rest_framework.permissions import AllowAny
from rest_framework.schemas.openapi import AutoSchema, SchemaGenerator
from rest_framework.compat import uritemplate


class OASSchemaGenerator(SchemaGenerator):
    """
    Describe my OAS schema info in detail (overriding what DRF put in) and list the servers where it can be found.
    """

    def get_schema(self, request, public):
        schema = super().get_schema(request, public)
        schema['info'] = {
            'version': '1.0',
            'title': 'SEP API',
        }
        schema['servers'] = [
            {'url': 'http://localhost:8000/', 'description': 'Local server'},
        ]
        schema['components']['securitySchemes'] = {
            'BearerAuth': {
                'type': 'http',
                'scheme': 'bearer'
            }
        }
        return schema


class CustomSchema(AutoSchema):

    def get_operation(self, path, method):
        operations = super().get_operation(path, method)
        operations['security'] = self.get_security(path, method)
        return operations

    def get_security(self, path, method):
        authentication_classes = getattr(
            self.view, 'authentication_classes', None)
        permission_classes = getattr(self.view, 'permission_classes', None)
        if authentication_classes == [] or permission_classes == [AllowAny]:
            return []
        return [{'BearerAuth': []}]
