from products.mutations import CreateHouseMutation, CreateNovelMutation, CreateTypeProduct, DeleteHouseMutation, DeleteNovelMutation, DeleteTypeProduct,  UpdateHouseMutation, UpdateNovelMutation, UpdateTypeProduct
from products.models import House, Novel , TypeProduct as kindProduct
from .types import HouseType,NovelType,TypeProduct
import graphene

class Query(graphene.ObjectType):
    house        = graphene.Field(HouseType, id = graphene.Int());
    novel        = graphene.Field(NovelType, id = graphene.Int());
    typeProduct  = graphene.Field(TypeProduct, id = graphene.Int());

    houses       = graphene.List(HouseType);
    novels       = graphene.List(NovelType);
    typeProducts = graphene.List(TypeProduct);

    def resolve_house(root,info,id):
        return House.objects.get(pk=id);
    def resolve_novel(root,info,id):
        return Novel.objects.get(pk=id);
    def resolve_typeProduct(root,info,id):
        return kindProduct.objects.get(pk=id);

    def resolve_houses(root,info) :  
        return House.objects.all();
    def resolve_novels(root,info):  
        return Novel.objects.all();
    def resolve_typeProducts(root,info):
        return kindProduct.objects.all();


class Mutation(graphene.ObjectType):
    create_house = CreateHouseMutation.Field()
    update_house = UpdateHouseMutation.Field()
    delete_house = DeleteHouseMutation.Field()

    create_novel = CreateNovelMutation.Field()
    update_novel = UpdateNovelMutation.Field()
    delete_novel = DeleteNovelMutation.Field()

    create_typeProduct = CreateTypeProduct.Field()
    update_typeProduct= UpdateTypeProduct.Field()
    delete_typeProduct = DeleteTypeProduct.Field()
    



schema = graphene.Schema(query= Query, mutation=Mutation);
