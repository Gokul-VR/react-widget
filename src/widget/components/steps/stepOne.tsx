import React from 'react';
import cookImage from '../../../assets/cook.png';
import outdoorImage from '../../../assets/outdoor.svg';
import FundRaisingImage from '../../../assets/fund-raising.svg';
import CorporateImage from '../../../assets/corporate.svg';
import OthersImage from '../../../assets/others.svg';
import PartiesImage from '../../../assets/parties.svg';
import WeddingImage from '../../../assets/wedding.svg';
type StepOneProps = {
  handleNext: () => void;
};
const StepOne: React.FC<StepOneProps> = ({ handleNext }) => {
  return (
    <>
      <div className='flex flex-row gap-2 '>
        <img src={cookImage} className='w-[7.8rem] h-[7.8rem]' />
        <div className='flex flex-col -ml-[0.9rem] gap-[0.7rem]'>
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
            className='text-white text-xl sm:text-2xl font-bold mb-7 sm:mb-8 text-left leading-[1.25] '
            style={{
              fontFamily:
                'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
            }}
          >
            Hi there! What type of catering you need?
          </h1>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4 px-[2rem] mb-[0.9rem]'>
        <CategoryCard
          icon={CorporateImage}
          label='Corporate'
          handleNext={handleNext}
        />
        <CategoryCard
          icon={WeddingImage}
          label='Wedding'
          handleNext={handleNext}
        />
        <CategoryCard
          icon={PartiesImage}
          label='Private Parties'
          handleNext={handleNext}
        />
        <CategoryCard
          icon={outdoorImage}
          label='Outdoor'
          handleNext={handleNext}
        />
        <CategoryCard
          icon={FundRaisingImage}
          label='Fund Raising'
          handleNext={handleNext}
        />
        <CategoryCard
          icon={OthersImage}
          label='Others'
          handleNext={handleNext}
        />
      </div>
    </>
  );
};
export default StepOne;

function CategoryCard({
  icon,
  label,
  handleNext,
}: {
  icon: string;
  label: string;
  handleNext: () => void;
}) {
  return (
    <>
      <div className='group flex flex-col items-center justify-between gap-[0.7rem]'>
        <div
          className='w-[5.79094rem] min-h-[7.25813rem] flex items-center justify-center flex-shrink-0 bg-[rgba(62,62,62,0.5)] border border-[#C2C2C2] rounded-[10px] hover:bg-[rgba(62,62,62,0.7)] transition-all duration-200 hover:scale-[1.02] hover:border-white/50 backdrop-blur-sm active:scale-95 hover:cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        >
          <img src={icon} alt='type' />
        </div>
        <span
          className='text-white text-[0.9rem] font-[600] text-center'
          style={{
            fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
            lineHeight: '96%',
          }}
        >
          {label}
        </span>
      </div>
    </>
  );
}
