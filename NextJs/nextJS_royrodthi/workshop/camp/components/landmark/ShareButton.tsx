'use client'

import { Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LineShareButton,
    LineIcon,
} from 'react-share'



const ShareButton = ({ landmarkId, name }: { landmarkId: string, name: string }) => {
    const url = process.env.NEXT_PUBLIC_URL
    const shareLink = `${url}/landmark/${landmarkId}`
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline'>
                    <Share2 />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side='top'
                align='end'
                className='flex justify-center w-full gap-x-2 items-center'
            >
                <FacebookShareButton url={shareLink} name={name} >
                    <FacebookIcon size='36px' className='rounded-md' />
                </FacebookShareButton>

                <EmailShareButton url={shareLink} name={name}>
                    <EmailIcon size='36px' className='rounded-md' />
                </EmailShareButton>
                <LineShareButton url={shareLink} name={name}>
                    <LineIcon size='36px' className='rounded-md' />
                </LineShareButton>
            </PopoverContent>
        </Popover>
    )
}
export default ShareButton