import { writable, derived } from 'svelte/store';
import { ProjectImpl } from '$lib/models/Project';
import type { ComponentImpl } from '$lib/models/Component';
import type { PageImpl } from '$lib/models/Page';

function createProjectStore() {
    // TODO: Get mock project from server
    const { subscribe, set, update } = writable<ProjectImpl>(
		new ProjectImpl('Store default project', 0, 'A store default project, this should never be visible.', [], [],
	));

    return {
        subscribe,
		set,
        // Project level updates
        updateTitle: (title: string) => update(project => {
            project.title = title;
            project.updatedAt = new Date();
            return project;
        }),
        updateDescription: (description: string) => update(project => {
            project.description = description;
            project.updatedAt = new Date();
            return project;
        }),

        setActiveComponent: (component: ComponentImpl) => update(project => {
            project.activeComponentUuid = component.uuid;
            return project;
        }),

        // Page level updates
        addPage: (page: PageImpl) => update(project => {
            project.pages.push(page);
            project.updatedAt = new Date();
            return project;
        }),
        removePage: (pageUuid: string) => update(project => {
            project.pages = project.pages.filter(p => p.uuid !== pageUuid);
            project.updatedAt = new Date();
            return project;
        }),
        updatePage: (updatedPage: PageImpl) => update(project => {
            const pageIndex = project.pages.findIndex(page => page.uuid === updatedPage.uuid);
            if (pageIndex !== -1) {
                project.pages[pageIndex] = updatedPage;
                project.updatedAt = new Date();
            }
            return project;
        }),

        // Component level updates (for global components)
        addComponent: (component: ComponentImpl) => update(project => {
            project.components.push(component);
            project.updatedAt = new Date();
            return project;
        }),
        removeComponent: (componentUuid: string) => update(project => {
            project.components = project.components.filter(comp => comp.uuid !== componentUuid);
            project.updatedAt = new Date();
            return project;
        }),
        updateComponent: (updatedComponent: ComponentImpl) => update(project => {
            const componentIndex = project.components.findIndex(comp => comp.uuid === updatedComponent.uuid);
            if (componentIndex !== -1) {
                project.components[componentIndex] = updatedComponent;
                project.updatedAt = new Date();
            }
            return project;
        }),
    };
}

export const projectStore = createProjectStore();

export const activeComponentUuidStore = derived(
	projectStore,
	$projectStore => $projectStore.activeComponentUuid
);
  