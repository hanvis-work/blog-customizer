import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type Props = {
	updateOptionStyle: (options: ArticleStateType) => void;
	optionStyle: ArticleStateType;
};

export const ArticleParamsForm = (props: Props) => {
	const { updateOptionStyle, optionStyle } = props;
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [options, setOptions] = useState({ ...optionStyle });

	const ref = useRef<HTMLDivElement>(null);

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	function handleSetFontFamily(option: OptionType) {
		setOptions({ ...options, fontFamilyOption: option });
	}

	function handleSetFontSize(option: OptionType) {
		setOptions({ ...options, fontSizeOption: option });
	}

	function handleSetFontColor(option: OptionType) {
		setOptions({ ...options, fontColor: option });
	}

	function handleSetbackgroundColor(option: OptionType) {
		setOptions({ ...options, backgroundColor: option });
	}

	function handleSetWidth(option: OptionType) {
		setOptions({ ...options, contentWidth: option });
	}

	function handleReset() {
		updateOptionStyle(defaultArticleState);
		setOptions(defaultArticleState);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		updateOptionStyle(options);
	}

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef: ref,
	});

	return (
		<>
			<div ref={ref}>
				<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text as={'h2'} size={31} weight={800} uppercase>
							Задайте параметры
						</Text>

						<Select
							options={fontFamilyOptions}
							selected={options.fontFamilyOption}
							title='Шрифт'
							onChange={handleSetFontFamily}
						/>

						<RadioGroup
							name={'radio'}
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={options.fontSizeOption}
							onChange={handleSetFontSize}
						/>

						<Select
							options={fontColors}
							selected={options.fontColor}
							title='Цвет шрифта'
							onChange={handleSetFontColor}
						/>

						<Separator />

						<Select
							options={backgroundColors}
							selected={options.backgroundColor}
							title='Цвет фона'
							onChange={handleSetbackgroundColor}
						/>

						<Select
							options={contentWidthArr}
							selected={options.contentWidth}
							title='Ширина контента'
							onChange={handleSetWidth}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
