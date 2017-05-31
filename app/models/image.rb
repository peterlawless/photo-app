class Image < ApplicationRecord
  belongs_to :user
  # associates the picture attribute on the Image model to the PictureUploader
  mount_uploader :picture, PictureUploader
  validate :picture_size

  private
  def picture_size
    if picture.size > 5.megabytes
      errors.add(:picture, "Should be less than 5 MB")
    end
  end

end
