
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const BlogShareButton = ({slug}) => {
    const url = `https://blog.schooling.app/blogs/${slug}`;   
    console.log(url);

  return (
    <div className="flex justify-between">
      <div>
        <FacebookShareButton className="mr-1" url={url}>
          <FacebookIcon bgStyle={{}} size={30} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton className="mr-1" url={url}>
          <LinkedinIcon bgStyle={{}} size={30} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton className="mr-1" url={url}>
          <TwitterIcon bgStyle={{}} size={30} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton className="mr-1" url={url}>
          <WhatsappIcon bgStyle={{}} size={30} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default BlogShareButton;
