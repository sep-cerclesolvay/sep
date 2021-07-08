from rest_framework.schemas.openapi import SchemaGenerator as JSONAPISchemaGenerator


class OASSchemaGenerator(JSONAPISchemaGenerator):
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
        return schema
