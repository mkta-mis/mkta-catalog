import { defineStore } from "pinia";
import { markRaw, ref } from "vue";

import Layout from "../../Pages/Admin/CMS/Catalog/CMSLayouts/Layout.vue";
import AutoLayout from "../../Pages/Admin/CMS/Catalog/CMSLayouts/AutoLayout.vue";
import CMSImage from "../../Pages/Admin/CMS/Catalog/CMSImage/CMSImage.vue";
import CMSCarousel from "../../Pages/Admin/CMS/Catalog/CMSCarousel/CMSCarousel.vue";
import CMSTextOnImage from "../../Pages/Catalog/CMS/CMSTextOnImage.vue";
import CMSLayout from "../../Pages/Catalog/CMS/CMSLayout.vue";
import CMSAutoLayout from "../../Pages/Catalog/CMS/CMSAutoLayout.vue";
import CMSCatalogCarousel from "../../Pages/Catalog/CMS/CMSCatalogCarousel.vue";

export const useCMSUIStore = defineStore("CMSUIStore", () => {
    const nodes = ref([]);
    const environment = ref("admin");

    const components = ref({
        layouts: [
            {
                title: "Grid",
                icon: "ri-checkbox-blank-line",
                component: {
                    type: markRaw(Layout),
                    props: {
                        children: [],
                    },
                },
                type: "layout",
            },
            {
                title: "Grid Item",
                icon: "bi-grid",
                component: {
                    type: markRaw(AutoLayout),
                    props: {
                        children: [],
                        size: 12,
                    },
                },
                type: "layout-auto",
            },
        ],
        elements: [
            {
                title: "Image",
                icon: "pr-image",
                component: {
                    type: markRaw(CMSImage),
                    props: {
                        link: false,
                        path: "/",
                        image: null,
                    },
                },
                type: "image",
            },
            {
                title: "Image Carousel",
                icon: "pr-images",
                component: {
                    type: markRaw(CMSCarousel),
                    props: {},
                },
                type: "carousel",
            },
        ],
    });

    function addToNodes(node, parentId) {
        const nodeToAdd = {
            ...node,
            component: {
                ...node.component,
                props: {
                    ...node.component.props,
                    id: Math.floor(Math.random() * 10_000_000).toString(),
                    parentId: parentId
                        ? parentId
                        : Math.floor(Math.random() * 10_000_000).toString(),
                },
            },
        };

        const foundNode = findNode(
            nodes.value,
            nodeToAdd.component.props.parentId,
        );

        if (foundNode)
            foundNode.component.props.children = [
                ...foundNode.component.props.children,
                nodeToAdd,
            ];
        else nodes.value.push(nodeToAdd);
    }

    function deleteNode(node) {
        const foundNode = findNode(nodes.value, node.parentId);

        if (foundNode) {
            //node is a sub-node (child of existing parent node)
            foundNode.component.props.children =
                foundNode.component.props.children.filter(
                    (n) => n.component.props.id !== node.id,
                );
        } else {
            //node is part of root nodes (top level node)
            nodes.value = nodes.value.filter(
                (n) => n.component.props.id !== node.id,
            );
        }
    }

    function updateNode(node) {
        const foundNode = findNode(nodes.value, node.parentId);

        if (foundNode) {
            console.log(foundNode);
            //node is a sub-node (child of existing parent node)
            foundNode.component.props.children =
                foundNode.component.props.children.map((child) => {
                    return node.id === child.component.props.id
                        ? {
                              ...child,
                              data: JSON.parse(JSON.stringify(node.data)),
                          }
                        : child;
                });
        } else {
            //node is part of root nodes (top level node)
            nodes.value = nodes.value.map((n) => {
                return n.component.props.id === node.id
                    ? {
                          ...n,
                          data: JSON.parse(JSON.stringify(node.data)),
                      }
                    : n;
            });
        }
    }

    function findNode(nodes, id) {
        for (const node of nodes) {
            if (node.component.props.id === id) {
                return node;
            }

            if (node.component.props.children) {
                const foundNode = findNode(node.component.props.children, id);
                if (foundNode) {
                    return foundNode;
                }
            }
        }

        return null;
    }

    function getNodes(data, env = "admin") {
        environment.value = env;
        if (!data) return;

        setComponentType(data);

        nodes.value = data;
    }

    function setComponentProps(props) {
        const foundNode = findNode(nodes.value, props.parentId);

        if (foundNode) {
            console.log(foundNode);
            //node is a sub-node (child of existing parent node)
            foundNode.component.props.children =
                foundNode.component.props.children.map((child) => {
                    return child.component.props.id === props.id
                        ? {
                              ...child,
                              component: {
                                  ...child.component,
                                  props: {
                                      ...props,
                                  },
                              },
                          }
                        : child;
                });
        } else {
            //node is part of root nodes (top level node)
            nodes.value = nodes.value.map((n) => {
                return n.component.props.id === props.id
                    ? {
                          ...n,
                          component: {
                              ...n.component,
                              props: {
                                  ...props,
                              },
                          },
                      }
                    : n;
            });
        }
    }

    function setComponentType(nodes) {
        nodes.forEach((node) => {
            node.component.type = getComponentType(node.type);

            const subNodes = node.component.props.children;

            if (subNodes) {
                setComponentType(subNodes);
            }
        });
    }

    function getComponentType(type) {
        switch (type) {
            case "image":
                return markRaw(
                    environment.value === "admin" ? CMSImage : CMSTextOnImage,
                );
            case "carousel":
                return markRaw(
                    environment.value === "admin"
                        ? CMSCarousel
                        : CMSCatalogCarousel,
                );
            case "layout":
                return markRaw(
                    environment.value === "admin" ? Layout : CMSLayout,
                );
            case "layout-auto":
                return markRaw(
                    environment.value === "admin" ? AutoLayout : CMSAutoLayout,
                );

            default:
                break;
        }
    }

    return {
        addToNodes,
        deleteNode,
        findNode,
        updateNode,
        setComponentProps,
        getNodes,
        components,
        nodes,
    };
});