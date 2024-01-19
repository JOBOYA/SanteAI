<template>
    <div class="card">
        <Timeline :value="events">
            <template #opposite="slotProps">
                <div class="timeline-animate">
                    <small class="p-text-secondary">{{ slotProps.item.date }}</small>
                </div>
            </template>
            <template #content="slotProps">
                <div class="timeline-animate">
                    <h3>{{ slotProps.item.title }}</h3>
                    {{ slotProps.item.status }}
                </div>
            </template>
        </Timeline>
    </div>
</template>


<script setup>
import { ref } from "vue";
import Timeline from 'primevue/timeline';
import { onMounted } from 'vue';

const animateTimelineElements = () => {
    const textElements = document.querySelectorAll('.timeline-animate');
    const linePointElements = document.querySelectorAll('.line-point-animate'); // Sélectionner les lignes et points

    textElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationDuration = '1s';
            el.style.animationDelay = `${index * 0.5}s`;
            el.classList.add('animated');

            // Animer la ligne et le point correspondant
            if (linePointElements[index]) {
                linePointElements[index].style.animationDuration = '1s';
                linePointElements[index].style.animationDelay = `${index * 0.5}s`;
                linePointElements[index].classList.add('animated');
            }
        }, index * 500);
    });
};

onMounted(() => {
    animateTimelineElements();
});

const events = ref([
    { title: 'Réponse au questionnaire', status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0'},
    { title: 'Traitement par l\'IA', status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { title: 'Résultats envoyés', status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { title: 'Fin du processus', status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);


</script>

<style scoped>
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Animation pour les lignes et les points */
.line-point-animate {
    opacity: 0;
    animation-name: fadeIn;
    animation-fill-mode: forwards;
}


.timeline-animate {
    opacity: 0;
    animation-name: fadeInUp;
    animation-fill-mode: forwards;
}

/* Optionnel : ajouter un style pour les lignes et les points */
.timeline-event-line, .timeline-event-marker {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    transition-delay: 0.5s; /* Ajustez ce délai si nécessaire */
}

.timeline-event-line.animated, .timeline-event-marker.animated {
    opacity: 1;
}

</style>