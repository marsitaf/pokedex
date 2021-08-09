<template lang="pug">
	div.welcome-view 
		div.poke-container
			div.welcome__image-container
				img(src="@/assets/images/red-circle.png", alt="Welcome")
				img(src="@/assets/images/hello-pikachu.png", alt="Welcome")
			div.welcome__description
				h1 Welcome to Pokédex
				p The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
				nuxt-link(to="/pokemons")
					poke-button(variant="primary", active) Get started
</template>

<style lang="scss">
	.welcome-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}
	.welcome__image-container {
		position: relative;
		display: flex;
		justify-content: center;
		max-width: 325px;
		width: 100%;
		margin: 0 auto;
		padding-top: 40px;
		img:first-child {
			left: -12px;
			bottom: 1px;
			position: relative;
		}
		img:last-child {
			position: absolute;
			z-index: 1;
			max-width: 210px;
			transform: scale(1.4);
		}
	}

	.welcome__description{
		text-align: center;
		padding-top: 40px;
		h1 {
			font-size: 26px;
			margin-bottom: 20px;
			font-weight: 600;
		}
		p {
			font-size: 18px;
			margin-bottom: 45px;
		}
	}
</style>
