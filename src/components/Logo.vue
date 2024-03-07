<template>
	<div>
		<a href="https://www.alyce.fr//" target="_blank">
			<img src="../assets/Alycelogo.webp" class="logo alyce" alt="Alyce logo" />
		</a>
	</div>
</template>

<style scoped>
.logo {
	height: 4em;
	padding: 1.5em;
	margin-bottom: 3em;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>