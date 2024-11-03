import { ReactNode } from 'react';

export interface ContentImage {
    width: number;
    height: number;
    alt: string;
    src: string;
}

export interface Experience {
    company: string;
    role: string;
    timeframe: string;
    achievements: ReactNode[];
    images: ContentImage[];
}

export interface Institution {
    name: ReactNode;
    description: ReactNode;
}

export interface Skill {
    title: string;
    description: ReactNode;
    images: ContentImage[];
}

export interface About {
    label: string;
    title: string;
    description: string;
    tableOfContent: {
        display: boolean;
        subItems: boolean;
    };
    avatar: {
        display: boolean;
    };
    calendar: {
        display: boolean;
        link: string;
    };
    intro: {
        title: string;
        display: boolean;
        description: ReactNode;
    };
    work: {
        title: string;
        display: boolean;
        experiences: Experience[];
    };
    studies: {
        title: string;
        display: boolean;
        institutions: Institution[];
    };
    technical: {
        title: string;
        display: boolean;
        skills: Skill[];
    };
}

export interface Person {
    name: string;
    role: string;
    location: string;
    avatar: string;
    languages: string[];
}

export interface Social {
    name: string;
    icon: string;
    link: string;
}

export interface Newsletter {
    display: boolean;
    title: ReactNode;
    description: ReactNode;
}

export interface Home {
    label: string;
    title: string;
    description: string;
    headline: ReactNode;
    subline: ReactNode;
}

export interface Blog {
    label: string;
    title: string;
    description: string;
}

export interface Work {
    label: string;
    title: string;
    description: string;
}

export interface Gallery {
    title: string;
    description: string;
    images: ContentImage[];
}

export interface RenderContentReturn {
    person: {
        firstName: string;
        lastName: string;
        name: string;
        role: string;
        avatar: string;
        location: string;
        languages: string[];
    };
    social: {
        name: string;
        icon: string;
        link: string;
    }[];
    newsletter: {
        display: boolean;
        title: ReactNode;
        description: ReactNode;
    };
    home: {
        label: string;
        title: string;
        description: string;
        headline: ReactNode;
        subline: ReactNode;
    };
    about: About;
    blog: {
        label: string;
        title: string;
        description: string;
    };
    work: {
        label: string;
        title: string;
        description: string;
    };
    gallery: {
        title: string;
        description: string;
        images: ContentImage[];
    };
} 