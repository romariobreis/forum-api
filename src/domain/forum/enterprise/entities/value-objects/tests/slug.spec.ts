import { expect, test } from "vitest";
import { Slug } from "../slug.js";

test('it should be able to create a slug from text', async () => {
  const slug = Slug.createFromText('An Title Example.')

  expect(slug.value).toEqual('an-title-example')
})
