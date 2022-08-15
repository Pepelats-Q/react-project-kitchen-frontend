/* eslint-disable no-console */
import { useState } from 'react';
import Button from '../../ui-library/Buttons/Button/Button';
import NavButton from '../../ui-library/Buttons/NavButton/NavButton';
import TextButton from '../../ui-library/Buttons/TextButton/TextButton';
import {
  AlertIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  DislikeIcon,
  EditIcon,
  GearIcon,
  HeartIcon,
  HeartIconFilled,
  HideIcon,
  HomeIcon,
  LikeIcon,
  LoginIcon,
  MinusIcon,
  PaperclipIcon,
  PlusIcon,
  ShowIcon,
  TrashIcon,
  MenuIcon,
} from '../../ui-library/Icons';
import TextArea from '../../ui-library/TextArea/TextArea';
import TextField from '../../ui-library/TextField/TextField';

import styles from './UI.module.scss';

const UI = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.h2}>Иконки</h2>
        <p className={styles.props}>
          {`<Icon onClick size='default' color='primary' className=''/>`}
        </p>
        <div className={styles.group_layout_icons}>
          <div>
            <AlertIcon /> <h4 className={styles.h4}>{`<AlertIcon />`}</h4>
          </div>
          <div>
            <CheckIcon /> <h4 className={styles.h4}>{`<CheckIcon />`}</h4>
          </div>
          <div>
            <ChevronLeftIcon /> <h4 className={styles.h4}>{`<ChevronLeftIcon />`}</h4>
          </div>
          <div>
            <ChevronRightIcon /> <h4 className={styles.h4}>{`<ChevronRightIcon />`}</h4>
          </div>
          <div>
            <CloseIcon /> <h4 className={styles.h4}>{`<CloseIcon />`}</h4>
          </div>
          <div>
            <CopyIcon /> <h4 className={styles.h4}>{`<CopyIcon />`}</h4>
          </div>
          <div>
            <DislikeIcon /> <h4 className={styles.h4}>{`<DislikeIcon />`}</h4>
          </div>
          <div>
            <EditIcon /> <h4 className={styles.h4}>{`<EditIcon />`}</h4>
          </div>
          <div>
            <GearIcon /> <h4 className={styles.h4}>{`<GearIcon />`}</h4>
          </div>
          <div>
            <HeartIcon /> <h4 className={styles.h4}>{`<HeartIcon />`}</h4>
          </div>
          <div>
            <HeartIconFilled /> <h4 className={styles.h4}>{`<HeartIconFilled />`}</h4>
          </div>
          <div>
            <HideIcon /> <h4 className={styles.h4}>{`<HideIcon />`}</h4>
          </div>
          <div>
            <HomeIcon /> <h4 className={styles.h4}>{`<HomeIcon />`}</h4>
          </div>
          <div>
            <LikeIcon /> <h4 className={styles.h4}>{`<LikeIcon />`}</h4>
          </div>
          <div>
            <LoginIcon /> <h4 className={styles.h4}>{`<LoginIcon />`}</h4>
          </div>
          <div>
            <MinusIcon /> <h4 className={styles.h4}>{`<MinusIcon />`}</h4>
          </div>
          <div>
            <PaperclipIcon /> <h4 className={styles.h4}>{`<PaperclipIcon />`}</h4>
          </div>
          <div>
            <PlusIcon /> <h4 className={styles.h4}>{`<PlusIcon />`}</h4>
          </div>
          <div>
            <ShowIcon /> <h4 className={styles.h4}>{`<ShowIcon />`}</h4>
          </div>
          <div>
            <TrashIcon /> <h4 className={styles.h4}>{`<TrashIcon />`}</h4>
          </div>
          <div>
            <MenuIcon /> <h4 className={styles.h4}>{`<MenuIcon />`}</h4>
          </div>
        </div>
        <div className={styles.group_layout}>
          <AlertIcon onClick={() => console.log('Icon click')} />
          <CheckIcon onClick={() => console.log('Icon click')} />
          <ChevronLeftIcon onClick={() => console.log('Icon click')} />
          <ChevronRightIcon onClick={() => console.log('Icon click')} />
          <CloseIcon onClick={() => console.log('Icon click')} />
          <CopyIcon onClick={() => console.log('Icon click')} />
          <DislikeIcon onClick={() => console.log('Icon click')} />
          <EditIcon onClick={() => console.log('Icon click')} />
          <GearIcon onClick={() => console.log('Icon click')} />
          <HeartIcon onClick={() => console.log('Icon click')} />
          <HeartIconFilled onClick={() => console.log('Icon click')} />
          <HideIcon onClick={() => console.log('Icon click')} />
          <HomeIcon onClick={() => console.log('Icon click')} />
          <LikeIcon onClick={() => console.log('Icon click')} />
          <LoginIcon onClick={() => console.log('Icon click')} />
          <MinusIcon onClick={() => console.log('Icon click')} />
          <PaperclipIcon onClick={() => console.log('Icon click')} />
          <PlusIcon onClick={() => console.log('Icon click')} />
          <ShowIcon onClick={() => console.log('Icon click')} />
          <TrashIcon onClick={() => console.log('Icon click')} />
          <MenuIcon onClick={() => console.log('Icon click')} />
          <h4 className={styles.h4}>{`<icon onClick={Some function}/>`}</h4>
        </div>
        <div className={styles.group_layout}>
          <AlertIcon color='secondary' />
          <CheckIcon color='secondary' />
          <ChevronLeftIcon color='secondary' />
          <ChevronRightIcon color='secondary' />
          <CloseIcon color='secondary' />
          <CopyIcon color='secondary' />
          <DislikeIcon color='secondary' />
          <EditIcon color='secondary' />
          <GearIcon color='secondary' />
          <HeartIcon color='secondary' />
          <HeartIconFilled color='secondary' />
          <HideIcon color='secondary' />
          <HomeIcon color='secondary' />
          <LikeIcon color='secondary' />
          <LoginIcon color='secondary' />
          <MinusIcon color='secondary' />
          <PaperclipIcon color='secondary' />
          <PlusIcon color='secondary' />
          <ShowIcon color='secondary' />
          <TrashIcon color='secondary' />
          <MenuIcon color='secondary' />
          <h4 className={styles.h4}>{`<icon color='secondary'/>`}</h4>
        </div>
        <div className={styles.group_layout}>
          <AlertIcon color='alert' />
          <CheckIcon color='alert' />
          <ChevronLeftIcon color='alert' />
          <ChevronRightIcon color='alert' />
          <CloseIcon color='alert' />
          <CopyIcon color='alert' />
          <DislikeIcon color='alert' />
          <EditIcon color='alert' />
          <GearIcon color='alert' />
          <HeartIcon color='alert' />
          <HeartIconFilled color='alert' />
          <HideIcon color='alert' />
          <HomeIcon color='alert' />
          <LikeIcon color='alert' />
          <LoginIcon color='alert' />
          <MinusIcon color='alert' />
          <PaperclipIcon color='alert' />
          <PlusIcon color='alert' />
          <ShowIcon color='alert' />
          <TrashIcon color='alert' />
          <MenuIcon color='alert' />
          <h4 className={styles.h4}>{`<icon color='alert'/>`}</h4>
        </div>
      </div>
      <div>
        <h2 className={styles.h2}>Кнопка</h2>
        <p className={styles.props}>
          {`<Button icon onClick type='primary' disabled=false className=' children='Кнопка' isSubmit/>`}
        </p>
        <div className={styles.group_layout}>
          <Button />
          <h4 className={styles.h4}>{`<Button />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <Button type='outline_alert' />
          <h4 className={styles.h4}>{`<Button type='outline_alert' />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <Button disabled />
          <h4 className={styles.h4}>{`<Button disabled />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <Button icon={<CheckIcon />} />
          <h4 className={styles.h4}>{`<Button icon={<CheckIcon />} />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <Button icon={<TrashIcon />} type='outline_alert' />
          <h4 className={styles.h4}>{`<Button type='outline_alert' icon={<TrashIcon />} />`}</h4>
        </div>
      </div>
      <div>
        <h2 className={styles.h2}>Навигационная кнопка</h2>
        <p className={styles.props}>
          {`<NavButton icon, to='/', exact=true, className='', children='Кнопка' />`}
        </p>
        <div className={styles.group_layout}>
          <NavButton />
          <h4 className={styles.h4}>{`<NavButton to='/' />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <NavButton to='/ui' />
          <h4 className={styles.h4}>{`<NavButton to='/ui' />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <NavButton icon={<HomeIcon />} />
          <h4 className={styles.h4}>{`<NavButton to='/' icon={<HomeIcon />} />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <NavButton icon={<HomeIcon />} to='/ui' />
          <h4 className={styles.h4}>{`<NavButton to='/ui' icon={<HomeIcon />} />`}</h4>
        </div>
      </div>
      <div>
        <h2 className={styles.h2}>Текстовая кнопка</h2>
        <p
          className={styles.props}
        >{`<TextButton onClick, className = '', children = 'Кнопка'/>`}</p>
        <div className={styles.group_layout}>
          <TextButton />
          <h4 className={styles.h4}>{`<TextButton />`}</h4>
        </div>
      </div>
      <div>
        <h2 className={styles.h2}>Поле для ввода текста</h2>
        <p className={styles.props}>
          {`<TextField icon message name onChange ref value className='' label='Название поля' maxLength=128 minLength=0 placeholder='' required=false textfieldState='default' type='text'/>`}
        </p>
        <div className={styles.group_layout}>
          <TextField name='name1' onChange={setValue} value={value} />
          <h4 className={styles.h4}>{`<TextField name='name1' onChange={func} value={value} />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <TextField
            icon={<ShowIcon onClick={() => console.log('Input icon click')} />}
            name='name2'
            onChange={setValue}
            type='password'
            value={value}
          />
          <h4 className={styles.h4}>{`<TextField name='name2' onChange={func} value={value} />`}</h4>
        </div>
        <div className={styles.group_layout}>
          <TextField
            message='Error message'
            name='name3'
            onChange={setValue}
            textfieldState='error'
            type='password'
            value={value}
          />
          <h4 className={styles.h4}>
            {`<TextField message='Error message' name='name3' onChange={func} textfieldState='error' type='password' value={value} />`}
          </h4>
        </div>
        <div className={styles.group_layout}>
          <TextField
            message='Success message'
            name='name4'
            onChange={setValue}
            textfieldState='success'
            type='password'
            value={value}
          />
          <h4 className={styles.h4}>
            {`<TextField message='Success message' name='name4' onChange={func} textfieldState='success' type='password' value={value} />`}
          </h4>
        </div>
      </div>
      <div>
        <h2 className={styles.h2}>Многострочное поле для ввода текста</h2>
        <p className={styles.props}>
          {`<TextArea message  name  onChange  ref  value  className = ''  label = 'Название поля'  maxLength = 512  minLength = 0  placeholder = ''  required = false  rows = 5  textareaState = 'default'  type = 'text' />`}
        </p>
        <div className={styles.group_layout}>
          <TextArea name='name5' />
          <h4 className={styles.h4}>{`<TextArea name='name5' />`}</h4>
        </div>
      </div>
      <div>
        <h2 className={styles.h2}>Типографика</h2>
        <div className={styles.group_layout}>
          <h1 className='header-h1 color-primary'>H1</h1>
          <h4 className={styles.h4}>header-h1 color-primary</h4>
        </div>
        <div className={styles.group_layout}>
          <h2 className='header-h2 color-primary'>H2</h2>
          <h4 className={styles.h4}>header-h2 color-primary</h4>
        </div>
        <div className={styles.group_layout}>
          <h3 className='header-headline color-primary'>headline</h3>
          <h4 className={styles.h4}>header-headline color-primary</h4>
        </div>
        <div className={styles.group_layout}>
          <p className='text-default color-primary'>text</p>
          <h4 className={styles.h4}>text-default color-primary</h4>
        </div>
        <div className={styles.group_layout}>
          <h3 className='text-link color-primary'>text link</h3>
          <h4 className={styles.h4}>text-link color-primary</h4>
        </div>
        <div className={styles.group_layout}>
          <h3 className='text-caption color-primary'>caption</h3>
          <h4 className={styles.h4}>text-caption color-primary</h4>
        </div>
      </div>
    </div>
  );
};

export default UI;
