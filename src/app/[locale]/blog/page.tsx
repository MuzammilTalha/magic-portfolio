import { Flex, Heading } from '@/once-ui/components';
import { Substack } from '@/components/Substack'; // Ensure this path is correct
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {

	const t = await getTranslations();
	const { blog } = renderContent(t);

	const title = blog.title;
	const description = blog.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/blog`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Blog(
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);

	const t = useTranslations();
	const { person, blog, newsletter } = renderContent(t);
	return (
		<Flex
			fillWidth maxWidth="s"
			direction="column">
			<Heading
				marginBottom="l"
				variant="display-strong-s">
				{blog.title}
			</Heading>
			<Flex
				fillWidth flex={1} direction="column">
				<Posts range={[1, 3]} locale={locale} />
				<Posts range={[4]} columns="2" locale={locale} />
			</Flex>
			{newsletter.display && (
				<Substack newsletter={newsletter} />
			)}
		</Flex>
	);
}
