import './component';
import './config';
import './preview';

/**
 * @private since v6.5.0
 */
Shopware.Service('cmsService').registerCmsElement({
    name: 'image-slider',
    label: 'sw-cms.elements.imageSlider.label',
    component: 'sw-cms-el-image-slider',
    configComponent: 'sw-cms-el-config-image-slider',
    previewComponent: 'sw-cms-el-preview-image-slider',
    defaultConfig: {
        sliderItems: {
            source: 'static',
            value: [],
            required: true,
            entity: {
                name: 'media',
            },
        },
        navigationArrows: {
            source: 'static',
            value: 'outside',
        },
        navigationDots: {
            source: 'static',
            value: null,
        },
        displayMode: {
            source: 'static',
            value: 'standard',
        },
        minHeight: {
            source: 'static',
            value: '300px',
        },
        verticalAlign: {
            source: 'static',
            value: null,
        },
    },
    enrich: function enrich(elem, data) {
        if (Object.keys(data).length < 1) {
            return;
        }

        let entityCount = 0;
        Object.keys(elem.config).forEach((configKey) => {
            const entity = elem.config[configKey].entity;

            if (!entity) {
                return;
            }

            const entityKey = `entity-${entity.name}-${entityCount}`;
            entityCount += 1;

            if (!data[entityKey]) {
                return;
            }

            elem.data[configKey] = [];
            elem.config[configKey].value.forEach((sliderItem) => {
                elem.data[configKey].push({
                    newTab: sliderItem.newTab,
                    url: sliderItem.url,
                    media: data[entityKey].get(sliderItem.mediaId),
                });
            });
        });
    },
});
