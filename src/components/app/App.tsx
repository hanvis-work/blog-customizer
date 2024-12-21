import { CSSProperties, useState } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
	const [optionStyle, setOptionStyle] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': optionStyle.fontFamilyOption.value,
					'--font-size': optionStyle.fontSizeOption.value,
					'--font-color': optionStyle.fontColor.value,
					'--container-width': optionStyle.contentWidth.value,
					'--bg-color': optionStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				updateOptionStyle={setOptionStyle}
				optionStyle={optionStyle}
			/>
			<Article />
		</main>
	);
};
