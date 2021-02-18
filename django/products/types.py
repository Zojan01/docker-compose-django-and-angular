from graphene_django.types import DjangoObjectType
from .models import House,Novel, TypeProduct

class HouseType(DjangoObjectType):
    class Meta:
        model = House
        fields = '__all__'

class NovelType(DjangoObjectType):
    class Meta:
        model = Novel
        fields = '__all__'

class TypeProduct(DjangoObjectType):
    class Meta:
        model = TypeProduct
        fields = '__all__'



