'use client';

import React, { ReactNode } from 'react';
import { Flex, Text } from '@/once-ui/components';
import styles from './about.module.scss';

interface TableOfContentsProps {
    structure: {
        title: string;
        display: boolean;
        items: ReactNode[];
    }[];
    about: {
        tableOfContent: {
            display: boolean;
            subItems: boolean;
        };
    };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
    const scrollTo = (id: ReactNode, offset: number) => {
        // Convert ReactNode to string if needed
        const elementId = typeof id === 'string' 
            ? id 
            : id && typeof id === 'object' && 'props' in id 
                ? (id.props?.children?.[0] || '').toString()
                : '';
                
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    if (!about.tableOfContent.display) return null;

    return (
        <Flex
            style={{
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                whiteSpace: 'nowrap'
            }}
            position="fixed"
            paddingLeft="24" gap="32"
            direction="column" hide="s">
            {structure
                .filter(section => section.display)
                .map((section, sectionIndex) => (
                <Flex key={sectionIndex} gap="12" direction="column">
                    <Flex
                        style={{ cursor: 'pointer' }}
                        className={styles.hover}
                        gap="8"
                        alignItems="center"
                        onClick={() => scrollTo(section.title, 80)}>
                        <Flex
                            height="1" width="16"
                            background="neutral-strong">
                        </Flex>
                        <Text>
                            {section.title}
                        </Text>
                    </Flex>
                    {about.tableOfContent.subItems && (
                        <>
                            {section.items.map((item, itemIndex) => (
                                <Flex
                                    key={itemIndex}
                                    style={{ cursor: 'pointer' }}
                                    className={styles.hover}
                                    gap="12" paddingLeft="24"
                                    alignItems="center"
                                    onClick={() => scrollTo(item, 80)}>
                                    <Flex
                                        height="1" width="8"
                                        background="neutral-strong">
                                    </Flex>
                                    <Text>
                                        {item}
                                    </Text>
                                </Flex>
                            ))}
                        </>
                    )}
                </Flex>
            ))}
        </Flex>
    );
};

export default TableOfContents;
