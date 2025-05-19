<script setup lang="ts">
import TaskCreateForm from '@/components/task/TaskCreateForm.vue';
import TaskList from '@/components/task/TaskList.vue';
import TeamShow from '@/components/team/TeamShow.vue';

</script>

<template>
    <div id="app">
        <div>
            <TeamShow />
        </div>
        <div>
            <TaskCreateForm />
        </div>
        <div>
            <TaskList />
        </div>
    </div>
</template>