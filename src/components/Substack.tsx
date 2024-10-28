"use client";

import { substack } from '@/app/resources';
import { Button, Flex, Heading, Input, Text } from '@/once-ui/components';
import { Background } from '@/once-ui/components/Background';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface NewsletterProps {
    display: boolean;
    title: string | JSX.Element;
    description: string | JSX.Element;
}

interface SubstackProps {
    newsletter: NewsletterProps;
}

export const Substack = ({ newsletter }: SubstackProps) => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);

    const t = useTranslations();

    const validateEmail = (email: string): boolean => {
        if (email === '') {
            return true;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Redirect to Substack subscription page
        window.location.href = `https://muzammilmohammed.substack.com/subscribe?email=${encodeURIComponent(email)}`;
    };

    return (
        <Flex
            style={{ overflow: 'hidden' }}
            position="relative"
            fillWidth padding="l" radius="l" marginBottom="m"
            direction="column" alignItems="center" align="center"
            background="surface" border="neutral-medium" borderStyle="solid-1">
            <Background
                position="absolute"
                gradient={substack?.effects?.gradient || false}
                dots={substack?.effects?.dots || false}
                lines={substack?.effects?.lines || false} />
            <Heading style={{ position: 'relative' }}
                marginBottom="s"
                variant="display-strong-xs">
                {newsletter.title}
            </Heading>
            <Text
                style={{
                    position: 'relative',
                    maxWidth: 'var(--responsive-width-xs)'
                }}
                wrap="balance"
                marginBottom="l"
                onBackground="neutral-medium">
                {newsletter.description}
            </Text>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                onSubmit={handleSubmit}
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form">
                <Flex id="mc_embed_signup_scroll"
                    fillWidth maxWidth={24} gap="8">
                    <Input
                        formNoValidate
                        labelAsPlaceholder
                        id="mce-EMAIL"
                        name="EMAIL"
                        type="email"
                        label="Email"
                        required
                        onChange={handleChange}
                        onBlur={() => setTouched(true)}
                        error={error} />
                    <div className="clear">
                        <Flex height="48" alignItems="center">
                            <Button
                                id="mc-embedded-subscribe"
                                value="Subscribe"
                                size="m"
                                fillWidth>
                                {t("newsletter.button")}
                            </Button>
                        </Flex>
                    </div>
                </Flex>
            </form>
        </Flex>
    );
};

export default Substack;
