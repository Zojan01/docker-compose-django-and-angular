from .types import HouseType,TypeProduct,NovelType
from .models import House, TypeProduct as KindProduct, Novel
import graphene

class CreateNovelMutation(graphene.Mutation):
    class Arguments:
        name    =   graphene.String();
        price   =   graphene.Int();
        author  =   graphene.String();
        summary =   graphene.String();
        ageLimit = graphene.Int();
        pathPoster = graphene.String();
        typeProduct= graphene.Int();

    novel = graphene.Field(NovelType);
    @classmethod
    def mutate(cls,root,info,name,price,author,summary,ageLimit,pathPoster,typeProduct):
        novel = Novel(
            name    = name,
            price   = price, 
            author  = author,
            summary  = summary,
            ageLimit = ageLimit,
            pathPoster = pathPoster,
            typeProduct= typeProduct,
        );

        novel.save();
        
        return CreateNovelMutation (novel = novel)

class UpdateNovelMutation(graphene.Mutation):
    class Arguments:
        id      = graphene.ID();
        name    =   graphene.String();
        price   =   graphene.Int();
        author  =   graphene.String();
        summary =   graphene.String();
        ageLimit = graphene.Int();
        pathPoster = graphene.String();
        typeProduct= graphene.Int();

    novel = graphene.Field(NovelType);
    @classmethod
    def mutate(cls,root,info,id,name,price,author,summary,ageLimit,pathPoster,typeProduct):
        novel = Novel.objects.get(id = id);
    
        novel.name      = name;
        novel.price     = price;
        novel.author    = author;
        novel.summary   = summary;
        novel.ageLimit  = ageLimit;
        novel.pathPoster= pathPoster;
        novel.typeProduct= typeProduct;

        novel.save();
        
        return UpdateNovelMutation (novel = novel);

class DeleteNovelMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID();

    novel = graphene.Field(NovelType);
    @classmethod
    def mutate(cls,root,info,id):
        novel = Novel.objects.get(id = id);
        novel.delete();
        
        return UpdateNovelMutation (novel = novel);




class CreateHouseMutation(graphene.Mutation):
    class Arguments:
        name        = graphene.String();
        price       = graphene.Int();
        condition   = graphene.String();
        location    = graphene.String();
        sumary      = graphene.String();
        production_year = graphene.Date();
        pathPoster  = graphene.String();
        amountRoon  = graphene.Int();
        typeProduct = graphene.Int();

    house = graphene.Field(HouseType)

    @classmethod
    def mutate(cls,root,info,name,price,condition,location,sumary,production_year,pathPoster,amountRoon,typeProduct):
        house = House(
            name        = name,
            price       = price,
            condition   = condition,
            location    = location,
            sumary      = sumary,
            production_year= production_year,
            pathPoster  = pathPoster,
            amountRoon  = amountRoon,
            typeProduct = typeProduct,            );
        house.save()
        
        return CreateHouseMutation (house = house)

class UpdateHouseMutation(graphene.Mutation):
    class Arguments:
        id          = graphene.ID()
        name        = graphene.String();
        price       = graphene.Int();
        condition   = graphene.String();
        location    = graphene.String();
        sumary      = graphene.String();
        production_year = graphene.Date();
        pathPoster  = graphene.String();
        amountRoon  = graphene.Int();
        typeProduct = graphene.Int();

    house = graphene.Field(HouseType)

    @classmethod
    def mutate(cls,root,info,id,name,price,condition,location,sumary,production_year,pathPoster,amountRoon,typeProduct):
        house = House.objects.get(id=id) ;
    
        house.name        = name;
        house.price       = price;
        house.condition   = condition;
        house.location    = location;
        house.sumary      = sumary;
        house.production_year= production_year;
        house.pathPoster  = pathPoster;
        house.amountRoon  = amountRoon;
        house.typeProduct = typeProduct;          
        house.save()
        
        return UpdateHouseMutation (house = house)

class DeleteHouseMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    house = graphene.Field(HouseType)

    @classmethod
    def mutate(cls,root,info,id):
        house = House.objects.get(id=id);
        house.delete();

        return 




class CreateTypeProduct(graphene.Mutation):
    class Arguments:
        name = graphene.String(required= True);
        fieldsType = graphene.String();
        fieldsName = graphene.String();

    typeProduct = graphene.Field(TypeProduct);

    @classmethod
    def mutate(cls,root,info,name,fieldsType,fieldsName):
        typeProduct = KindProduct(
            name = name,  
            fieldsType = fieldsType,
            fieldsName = fieldsName,

        );
        typeProduct.save();
        
        return CreateTypeProduct (typeProduct = typeProduct);

class UpdateTypeProduct(graphene.Mutation):
    class Arguments:
        id          = graphene.ID();
        name        = graphene.String(required= True);
        fieldsType  = graphene.String();
        fieldsName  = graphene.String();

    typeProduct = graphene.Field(TypeProduct);

    @classmethod
    def mutate(cls,root,info,id,name,fieldsType,fieldsName):
        typeProduct = KindProduct.objects.get(id=id)
        
        typeProduct.name = name,  
        typeProduct.fieldsType = fieldsType,
        typeProduct.fieldsName = fieldsName

    
        typeProduct.save()
        
        return CreateTypeProduct (typeProduct = typeProduct)

class DeleteTypeProduct(graphene.Mutation):
    class Arguments:
        id = graphene.ID();

    typeProduct = graphene.Field(TypeProduct);

    @classmethod
    def mutate(cls,root,info,id):
        typeProduct = KindProduct.objects.get(id=id);
        typeProduct.delete();
        
        return 



