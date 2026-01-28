import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Label } from '@/shared/components/ui/label';

export default function ScheduleTypeRadioGroup({
  value,
  onChange,
}: {
  value: 'INTERVIEW' | 'ETC';
  onChange: (value: 'INTERVIEW' | 'ETC') => void;
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className='flex flex-col gap-y-2'
    >
      <Label className='font-black'>전형 종류</Label>

      <div className='grid grid-cols-2 gap-x-2'>
        <Label
          htmlFor='interview'
          className='flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-muted'
        >
          <RadioGroupItem value='INTERVIEW' id='interview' />
          <div>
            <p className='font-medium'>면접 전형</p>
          </div>
        </Label>

        <Label
          htmlFor='etc'
          className='flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-muted'
        >
          <RadioGroupItem value='ETC' id='etc' />
          <div>
            <p className='font-medium'>기타 전형</p>
          </div>
        </Label>
      </div>
    </RadioGroup>
  );
}
