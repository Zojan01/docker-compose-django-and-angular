from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from products.schema import schema
from graphene_django.views import GraphQLView


urlpatterns = [
    path('graphql',csrf_exempt(GraphQLView.as_view(graphiql=True, schema = schema)))
]