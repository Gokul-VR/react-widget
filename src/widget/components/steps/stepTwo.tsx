import cookImage from '../../../assets/cook.png';
import { RangeSlider } from '../elements/range-slider';

const StepTwo = ({}) => {
  return (
    <>
      <div className='flex flex-row gap-2 '>
        <img src={cookImage} className='w-[7.4rem] h-[7.4rem] md:w-[7.8rem] md:h-[7.8rem]' />
        <div className='flex flex-col md:-ml-[0.9rem] ml-0 gap-[0.7rem]'>
          <div className='-ml-[0.9rem]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M16.25 15.5C14.413 14.706 13.75 14 13.75 12C13.75 10 15 8.75 17 8.75C19 8.75 20.25 10 20.25 12C20.25 15.5 19.25 16.75 15.25 19.25C16.25 17.5 16.25 17 16.25 15.5ZM6.25 15.5C4.413 14.706 3.75 14 3.75 12C3.75 10 5 8.75 7 8.75C9 8.75 10.25 10 10.25 12C10.25 15.5 9.25 16.75 5.25 19.25C6.25 17.5 6.25 17 6.25 15.5Z'
                stroke='white'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </div>
          <h1
            className='text-white text-[1rem] sm:text-2xl font-bold mb-7 sm:mb-8 text-left leading-[1.25] '
            style={{
              fontFamily:
                'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
            }}
          >
            Got it! How many guests are you expecting?
          </h1>
        </div>
      </div>
      <div className='px-[0.8rem] md:px-[2.2rem] py-8 mb-[2.78rem] md:mb-[5.05rem]'>
        <RangeSlider />
      </div>
    </>
  );
};
export default StepTwo;
