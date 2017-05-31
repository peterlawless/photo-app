class Image < ApplicationRecord
  belongs_to :user
  # associates the picture attribute on the Image model to the PictureUploader
  mount_uploader :picture, PictureUploader
end
