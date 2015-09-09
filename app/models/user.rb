class User < ActiveRecord::Base
  validates :password_digest, :email, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :email, uniqueness: true

  after_initialize :ensure_session_token!

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save
    self.session_token
  end

  def ensure_session_token!
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
