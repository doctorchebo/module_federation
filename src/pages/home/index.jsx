import React from 'react';
import DesktopContainer from 'application/components/container/index';
import PageHeader from './components/PageHeader/index';
import locale from './locale/en.json';
import FormationPrograms from './components/FormationPrograms';
import InformationSection from './components/InformationSection';
import Footer from 'application/components/footer';
/**
 * @returns {object} - home component
 */
export default function Home() {
	return (
		<DesktopContainer>
			<PageHeader constants={locale.header} />
			<InformationSection value={locale.dataSections.firstSection} />
			<FormationPrograms programs={locale.programs.content} title={locale.programs.title} />
			<InformationSection value={locale.dataSections.secondSection} isReversed={true} />
			<Footer />
		</DesktopContainer>
	);
}
