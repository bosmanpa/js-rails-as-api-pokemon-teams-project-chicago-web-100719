class PokemonsController < ApplicationController



def create
    pokemon = Pokemon.new(pokemon_params)
    pokemon.nickname = Faker::Name.first_name
    pokemon.species = Faker::Games::Pokemon.name
    pokemon.save
    render json: pokemon
end

def destroy 
    pokemon = Pokemon.find(params[:id])
    pokemon.delete
    render json: pokemon
end

private
    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
 