import type { Metadata } from "next";
import { Avatar, AvatarGroup } from "marclayui";
import { Demo, DocHeader, PropsTable } from "@/components/docs";

export const metadata: Metadata = {
  title: "Avatar",
  description: "Squircle clay avatars with initials, images, status dots and grouped stacks.",
};

const BASIC = `<Avatar name="Akram Khan" />
<Avatar name="Sara Iqbal" gradient />
<Avatar src="/photo.jpg" alt="Zaid's avatar" />

{/* sizes: xs sm md lg xl */}
<Avatar size="lg" name="Nina Park" gradient />`;

const STATUS = `<Avatar name="Akram Khan" status="online" />
<Avatar name="Sara Iqbal" status="busy" gradient />
<Avatar name="Ravi Menon" status="offline" />`;

const GROUP = `<AvatarGroup>
  <Avatar size="sm" name="Ravi Menon" />
  <Avatar size="sm" name="Nina Park" gradient />
  <Avatar size="sm" name="Omar Ali" />
  <Avatar size="sm" name="+9" gradient />
</AvatarGroup>`;

export default function AvatarPage() {
  return (
    <>
      <DocHeader
        tag="Components"
        title="Avatar"
        lead="The signature clay squircle. Shows an image, or derives initials from a name; add a status dot or group several into an overlapping stack."
        importCode={`import { Avatar, AvatarGroup } from "marclayui";`}
      />

      <Demo title="Initials, gradient & sizes" code={BASIC}>
        <Avatar name="Akram Khan" />
        <Avatar name="Sara Iqbal" gradient />
        <Avatar size="sm" name="Zaid R." />
        <Avatar size="lg" name="Nina Park" gradient />
        <Avatar size="xl" name="Omar Ali" />
      </Demo>

      <Demo title="Status dots" code={STATUS}>
        <Avatar name="Akram Khan" status="online" />
        <Avatar name="Sara Iqbal" status="busy" gradient />
        <Avatar name="Ravi Menon" status="offline" />
      </Demo>

      <Demo title="Grouped" code={GROUP}>
        <AvatarGroup>
          <Avatar size="sm" name="Ravi Menon" />
          <Avatar size="sm" name="Nina Park" gradient />
          <Avatar size="sm" name="Omar Ali" />
          <Avatar size="sm" name="+9" gradient />
        </AvatarGroup>
      </Demo>

      <PropsTable
        rows={[
          { name: "src", type: "string", description: "Image URL; falls back to initials." },
          { name: "name", type: "string", description: "Used for initials and the accessible label." },
          { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Scale of the squircle and font." },
          { name: "status", type: '"online" | "offline" | "busy"', description: "Colored dot pinned to the corner." },
          { name: "gradient", type: "boolean", default: "false", description: "Primary gradient fill with clay light." },
        ]}
      />
    </>
  );
}
