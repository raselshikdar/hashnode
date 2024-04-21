import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { Article } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import Typography from "@/shared/Typography";
import { Avatar, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import { FC, Fragment } from "react";
import { ChatIcon, HeartIcon } from "../icons";

interface PostCommentsProps {
  comments?: Article["comments"];
  isReply?: boolean;
  authorId: string;
}

export const PostComments: FC<PostCommentsProps> = ({
  comments,
  isReply,
  authorId,
}) =>
  comments?.edges.map(
    ({
      node: {
        id,
        author: { id: commenterId, name, username, profilePicture },
        dateAdded,
        content,
        totalReactions,
        replies,
      },
    }) => (
      <Fragment key={id}>
        <div
          className={cn({
            "p-6": !isReply,
            "pt-2 px-2": isReply,
          })}
        >
          {isReply && (
            <Divider className="mb-3 ml-5 h-6 w-[2px]" orientation="vertical" />
          )}
          <div>
            <div className="flex items-start gap-2">
              <Link href={`/users/${username}`}>
                <Avatar
                  src={profilePicture || DEFAULT_PROFILE_PICTURE}
                  size="sm"
                />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <Link href={`/users/${username}`}>
                    <Typography variant="h6" className="leading-none">
                      {name}
                    </Typography>
                  </Link>
                  {authorId === commenterId && (
                    <Chip
                      color="success"
                      variant="flat"
                      size="sm"
                      classNames={{
                        content: "font-medium",
                      }}
                    >
                      Author
                    </Chip>
                  )}
                </div>
                <span className="text-foreground-500 text-sm">
                  {formatDate(dateAdded, "MMM dd")}
                </span>
              </div>
            </div>
            <p className="mt-2.5 text-foreground-600">{content.text}</p>
            <div className="mt-2.5 flex items-center gap-4 text-foreground-600">
              <div className="flex items-center">
                <Tooltip
                  content="Like this article"
                  showArrow={false}
                  offset={15}
                  delay={1000}
                >
                  <Button isIconOnly variant="light" size="sm">
                    <HeartIcon className="text-foreground-600" />
                  </Button>
                </Tooltip>
                {!!totalReactions && (
                  <span
                    role="button"
                    className="cursor-pointer hover:underline text-sm"
                  >
                    {totalReactions}
                  </span>
                )}
              </div>
              {!isReply && (
                <div className="flex items-center">
                  <Tooltip
                    content="Like this article"
                    showArrow={false}
                    offset={15}
                    delay={1000}
                  >
                    <Button isIconOnly variant="light" size="sm">
                      <ChatIcon className="text-foreground-600" />
                    </Button>
                  </Tooltip>
                  <span
                    role="button"
                    className="cursor-pointer hover:underline text-sm"
                  >
                    {totalReactions}
                  </span>
                </div>
              )}
              <span
                role="button"
                className="cursor-pointer hover:underline text-sm font-medium"
              >
                Reply
              </span>
            </div>
          </div>
          <PostComments comments={replies} isReply authorId={authorId} />
        </div>
        {!isReply && <Divider />}
      </Fragment>
    )
  );