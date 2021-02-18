import graphene
from .types import HouseType,NovelType,TypeProdcut


class Query(graphene.ObjectType):

    house       = graphene.Field(HouseType, id = graphene.Int())
    book        = graphene.Field(NovelType, id = graphene.Int())
    tyProduct   = graphene.Field(TypeProdcut, id = graphene.Int())

    houses      = graphene.List(HouseType)
    novels      = graphene.List(NovelType)
    tyProducts  = graphene.List(TypeProdcut)
